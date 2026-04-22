import requests
from bs4 import BeautifulSoup
import sqlite3

def guardar_producto(nombre, precio, supermercado):
    conn = sqlite3.connect("precios.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            precio REAL,
            supermercado TEXT
        )
    """)

    cursor.execute(
        "INSERT INTO productos (nombre, precio, supermercado) VALUES (?, ?, ?)",
        (nombre, precio, supermercado)
    )

    conn.commit()
    conn.close()


def scrap_supertop(busqueda="leche"):
    url = f"https://www.supertop.com.ar/buscar?q={busqueda}"
    
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    productos = soup.find_all("div")

    for p in productos:
        texto = p.get_text().strip()

        if "$" in texto:
            try:
                partes = texto.split("$")
                nombre = partes[0].strip()
                precio = float(partes[1].replace(".", "").replace(",", "."))

                guardar_producto(nombre, precio, "SuperTop")
            except:
                pass


if __name__ == "__main__":
    scrap_supertop("leche")
