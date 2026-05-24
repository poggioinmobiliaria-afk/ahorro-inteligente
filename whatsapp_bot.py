"""
WhatsApp Bot para Ahorro Inteligente — powered by Twilio
Recibe mensajes de WhatsApp, busca precios y responde con comparativas.

Setup:
  1. Crear cuenta en twilio.com/try-twilio (gratis)
  2. Activar WhatsApp Sandbox en Twilio Console > Messaging > Try it out > Send a WhatsApp message
  3. Copiar .env.example a .env y completar las credenciales
  4. Exponer este servidor con: ngrok http 5000
  5. Pegar la URL de ngrok en Twilio Sandbox como Webhook URL: https://XXXX.ngrok.io/whatsapp
"""

import os
import sqlite3
import requests
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

DB_PATH = os.getenv("DB_PATH", "precios.db")
SUPERTOP_API = "https://www.supertop.com.ar/api/catalog_system/pub/products/search/{}"


# ---------------------------------------------------------------------------
# Lógica de búsqueda
# ---------------------------------------------------------------------------

def buscar_en_db(producto: str) -> list[dict]:
    """Busca productos en la base de datos local (coincidencia parcial)."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT nombre, precio, supermercado FROM productos WHERE nombre LIKE ? ORDER BY precio ASC",
            (f"%{producto}%",)
        )
        rows = cursor.fetchall()
        conn.close()
        return [{"nombre": r[0], "precio": r[1], "supermercado": r[2]} for r in rows]
    except Exception:
        return []


def buscar_en_supertop(producto: str) -> list[dict]:
    """Consulta la API de SuperTop y retorna los primeros 5 resultados."""
    try:
        resp = requests.get(SUPERTOP_API.format(producto), timeout=6)
        data = resp.json()
        resultados = []
        for item in data[:5]:
            nombre = item.get("productName")
            precio = item["items"][0]["sellers"][0]["commertialOffer"]["Price"]
            resultados.append({"nombre": nombre, "precio": precio, "supermercado": "SuperTop"})
        return resultados
    except Exception:
        return []


def formatear_respuesta(query: str, resultados: list[dict]) -> str:
    """Convierte la lista de resultados en texto para WhatsApp."""
    if not resultados:
        return (
            f"😕 No encontré precios para *{query}*.\n"
            "Intentá con otro nombre (ej: leche, arroz, coca cola)."
        )

    # Agrupa por nombre de producto y toma el más barato por supermercado
    por_nombre: dict[str, list[dict]] = {}
    for r in resultados:
        por_nombre.setdefault(r["nombre"], []).append(r)

    lineas = [f"🛒 *Precios para: {query}*\n"]
    for nombre, items in list(por_nombre.items())[:3]:  # max 3 productos
        precios_ordenados = sorted(items, key=lambda x: x["precio"])
        mejor = precios_ordenados[0]
        lineas.append(f"📦 *{nombre}*")
        for item in precios_ordenados:
            emoji = "✅" if item == mejor else "  "
            lineas.append(f"  {emoji} {item['supermercado']}: ${item['precio']:,.0f}")
        lineas.append("")

    lineas.append("💡 Respondé con otro producto para seguir comparando.")
    return "\n".join(lineas)


# ---------------------------------------------------------------------------
# Webhook de Twilio
# ---------------------------------------------------------------------------

AYUDA = (
    "🛒 *Ahorro Inteligente* — Comparador de precios\n\n"
    "Mandame el nombre de cualquier producto y te muestro los precios en diferentes supermercados.\n\n"
    "*Ejemplos:*\n"
    "• leche\n"
    "• arroz\n"
    "• coca cola\n"
    "• yerba\n\n"
    "Escribí *ayuda* en cualquier momento para ver este mensaje."
)


@app.route("/whatsapp", methods=["POST"])
def whatsapp_webhook():
    """Endpoint que Twilio llama cuando llega un mensaje de WhatsApp."""
    mensaje_entrante = request.form.get("Body", "").strip().lower()
    resp = MessagingResponse()
    msg = resp.message()

    if not mensaje_entrante or mensaje_entrante in ("ayuda", "help", "hola", "hello", "hi"):
        msg.body(AYUDA)
        return str(resp)

    # Buscar primero en la DB local, luego online si no hay resultados
    resultados = buscar_en_db(mensaje_entrante)
    if not resultados:
        resultados = buscar_en_supertop(mensaje_entrante)

    msg.body(formatear_respuesta(mensaje_entrante, resultados))
    return str(resp)


@app.route("/health")
def health():
    return {"status": "ok", "service": "ahorro-inteligente-whatsapp-bot"}


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
