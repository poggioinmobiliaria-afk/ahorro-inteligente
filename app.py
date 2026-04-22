import streamlit as st
import sqlite3
import pandas as pd

# ===================================
# CONFIGURACIÓN INICIAL
# ===================================

st.set_page_config(
    page_title="🛒 Mi Ahorro Inteligente", 
    layout="wide",
    initial_sidebar_state="collapsed"
)

# CSS Personalizado para móvil
st.markdown("""
<style>
    .stTextInput input {
        font-size: 18px !important;
        padding: 15px !important;
    }
    .producto-card {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 15px;
        border-left: 5px solid #667eea;
    }
    .oferta {
        border-left-color: #28a745;
        background: #d4edda;
    }
    .caro {
        border-left-color: #dc3545;
        background: #f8d7da;
    }
    .precio-grande {
        font-size: 32px;
        font-weight: bold;
        color: #667eea;
    }
</style>
""", unsafe_allow_html=True)

# ===================================
# BASE DE DATOS
# ===================================

@st.cache_resource
def init_database():
    """Inicializa base de datos con productos de ejemplo"""
    conn = sqlite3.connect("precios.db", check_same_thread=False)
    cursor = conn.cursor()
    
    # Crear tabla si no existe
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            precio REAL,
            supermercado TEXT
        )
    """)
    
    # Verificar si ya hay datos
    cursor.execute("SELECT COUNT(*) FROM productos")
    if cursor.fetchone()[0] == 0:
        # Insertar productos de ejemplo
        productos_ejemplo = [
            ("Leche La Serenísima 1L", 950, "SuperTop"),
            ("Leche La Serenísima 1L", 980, "Carrefour"),
            ("Leche La Serenísima 1L", 1020, "Día"),
            
            ("Arroz Dos Hermanos 1kg", 999, "SuperTop"),
            ("Arroz Dos Hermanos 1kg", 1050, "Día"),
            ("Arroz Dos Hermanos 1kg", 1100, "Carrefour"),
            
            ("Coca Cola 2.25L", 3862, "SuperTop"),
            ("Coca Cola 2.25L", 4200, "Carrefour"),
            ("Coca Cola 2.25L", 4100, "Día"),
            
            ("Aceite Cocinero 900ml", 2500, "SuperTop"),
            ("Aceite Cocinero 900ml", 2650, "Día"),
            ("Aceite Cocinero 900ml", 2800, "Carrefour"),
            
            ("Fideos Matarazzo 500g", 850, "SuperTop"),
            ("Fideos Matarazzo 500g", 920, "Carrefour"),
            
            ("Yerba Taragüí 1kg", 3200, "SuperTop"),
            ("Yerba Taragüí 1kg", 3450, "Día"),
            ("Yerba Taragüí 1kg", 3600, "Carrefour"),
            
            ("Papel Higiénico Elite x4", 1499, "SuperTop"),
            ("Papel Higiénico Elite x4", 1650, "Carrefour"),
            
            ("Detergente Magistral 500ml", 1200, "SuperTop"),
            ("Detergente Magistral 500ml", 1350, "Día"),
            
            ("Azúcar Ledesma 1kg", 1400, "SuperTop"),
            ("Azúcar Ledesma 1kg", 1550, "Carrefour"),
            
            ("Café La Virginia 250g", 4500, "SuperTop"),
            ("Café La Virginia 250g", 4800, "Carrefour"),
            
            ("Harina 000 1kg", 850, "SuperTop"),
            ("Harina 000 1kg", 920, "Día"),
            
            ("Galletitas Oreo 118g", 1200, "SuperTop"),
            ("Galletitas Oreo 118g", 1350, "Carrefour"),
        ]
        
        cursor.executemany(
            "INSERT INTO productos (nombre, precio, supermercado) VALUES (?, ?, ?)",
            productos_ejemplo
        )
        conn.commit()
    
    return conn

def get_connection():
    """Obtiene conexión a la base de datos"""
    return init_database()

# ===================================
# FUNCIONES
# ===================================

def analizar_precio(df_producto):
    """Analiza si un precio es oferta, normal o caro"""
    precio_actual = df_producto.iloc[0]["precio"]
    promedio = df_producto["precio"].mean()
    diferencia = ((precio_actual - promedio) / promedio) * 100
    
    if diferencia < -10:
        return "🔥 OFERTA", diferencia, "oferta"
    elif diferencia < 5:
        return "👍 NORMAL", diferencia, "normal"
    else:
        return "⚠️ CARO", diferencia, "caro"

# ===================================
# ESTADO DE SESIÓN
# ===================================

if "carrito" not in st.session_state:
    st.session_state.carrito = []

# ===================================
# INTERFAZ PRINCIPAL
# ===================================

st.title("🛒 Mi Ahorro Inteligente")
st.markdown("### 💰 Comprá inteligente, ahorrá en serio")

# Buscador
busqueda = st.text_input(
    "🔍 Buscá tu producto",
    placeholder="Ejemplo: leche, arroz, coca cola...",
    key="buscador"
)

# ===================================
# RESULTADOS DE BÚSQUEDA
# ===================================

if busqueda:

    resultados_online = buscar_supertop(busqueda)

    if resultados_online:
        st.markdown("### 🌐 Precios en SuperTop")
        
        for item in resultados_online:
            st.write(f"🛒 {item['nombre']}")
            st.write(f"💰 ${item['precio']}")
            st.markdown("---")

    conn = get_connection()
    
    # Buscar productos
    query = f"""
        SELECT nombre, precio, supermercado
        FROM productos
        WHERE nombre LIKE '%{busqueda}%'
    """
    
    df = pd.read_sql(query, conn)
    
    if not df.empty:
        st.markdown(f"### 📦 Resultados para '{busqueda}'")
        
        # Agrupar por nombre de producto
        productos_grupo = df.groupby("nombre")
        
        for nombre, grupo in productos_grupo:
            # Ordenar por precio
            grupo = grupo.sort_values(by="precio")
            mejor = grupo.iloc[0]
            
            # Analizar precio
            estado, diferencia, clase = analizar_precio(grupo)
            
            # Card del producto
            st.markdown(f"""
                <div class="producto-card {clase}">
                    <h3 style="margin: 0;">{nombre}</h3>
                </div>
            """, unsafe_allow_html=True)
            
            # Información principal
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.markdown(f"<div class='precio-grande'>${mejor['precio']:,.0f}</div>", unsafe_allow_html=True)
            
            with col2:
                st.write(f"**🏪 {mejor['supermercado']}**")
                st.write(f"{estado} ({diferencia:+.1f}%)")
            
            with col3:
                # Control de cantidad
                cantidad = st.number_input(
                    "Cantidad",
                    min_value=1,
                    value=1,
                    step=1,
                    key=f"cant_{nombre}",
                    label_visibility="collapsed"
                )
            
            # Botón agregar
            col_btn1, col_btn2 = st.columns([1, 2])
            
            with col_btn1:
                if st.button(f"➕ Agregar", key=f"btn_{nombre}", use_container_width=True):
                    st.session_state.carrito.append({
                        "producto": nombre,
                        "precio": float(mejor["precio"]),
                        "cantidad": cantidad,
                        "supermercado": mejor["supermercado"]
                    })
                    st.success(f"✅ Agregado: {cantidad}x {nombre}")
                    st.rerun()
            
            with col_btn2:
                # Ver opciones
                with st.expander("📋 Ver todas las opciones"):
                    st.dataframe(
                        grupo[["supermercado", "precio"]].reset_index(drop=True),
                        use_container_width=True,
                        hide_index=True
                    )
            
            st.markdown("---")
    
    else:
        st.warning(f"❌ No se encontraron productos para '{busqueda}'")
        st.info("💡 Productos disponibles: leche, arroz, coca cola, aceite, fideos, yerba, papel higiénico, detergente, azúcar, café, harina, galletitas")

# ===================================
# CARRITO DE COMPRAS
# ===================================

st.markdown("---")
st.markdown("## 🧾 Mi Lista de Compra")

if st.session_state.carrito:
    total = 0
    
    for i, item in enumerate(st.session_state.carrito):
        subtotal = item["precio"] * item["cantidad"]
        total += subtotal
        
        col1, col2, col3, col4 = st.columns([4, 2, 2, 1])
        
        with col1:
            st.write(f"**{item['producto']}**")
            st.caption(f"🏪 {item['supermercado']}")
        
        with col2:
            st.write(f"${item['precio']:,.0f}")
        
        with col3:
            st.write(f"x{item['cantidad']} = **${subtotal:,.0f}**")
        
        with col4:
            if st.button("🗑️", key=f"del_{i}"):
                st.session_state.carrito.pop(i)
                st.rerun()
    
    # Total
    st.markdown("---")
    st.markdown(f"### 💰 TOTAL: ${total:,.0f}")
    
    # Acciones
    col_accion1, col_accion2 = st.columns(2)
    
    with col_accion1:
        # Generar lista de texto
        texto_lista = "🛒 MI LISTA DE COMPRA\n"
        texto_lista += "=" * 50 + "\n\n"
        
        for item in st.session_state.carrito:
            subtotal = item["precio"] * item["cantidad"]
            texto_lista += f"✓ {item['producto']}\n"
            texto_lista += f"  🏪 {item['supermercado']}\n"
            texto_lista += f"  💰 ${item['precio']:,.0f} x {item['cantidad']} = ${subtotal:,.0f}\n\n"
        
        texto_lista += "=" * 50 + "\n"
        texto_lista += f"💰 TOTAL: ${total:,.0f}\n"
        
        st.download_button(
            "🖨️ Descargar Lista",
            texto_lista,
            "mi-lista-compra.txt",
            use_container_width=True
        )
    
    with col_accion2:
        if st.button("🗑️ Vaciar Lista", use_container_width=True):
            st.session_state.carrito = []
            st.rerun()

else:
    st.info("📝 Tu lista está vacía. Buscá productos arriba para comenzar.")

# ===================================
# FOOTER
# ===================================

st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #6c757d;'>
    <p>💡 <strong>Tip:</strong> Buscá por nombre (leche, arroz, coca cola...) y compará precios</p>
    <p>🛒 Agregá productos a tu lista y descargala para llevar al super</p>
</div>
""", unsafe_allow_html=True)
          
import requests

def buscar_supertop(producto):
    url = f"https://www.supertop.com.ar/api/catalog_system/pub/products/search/{producto}"
    
    response = requests.get(url)
    data = response.json()
    
    resultados = []
    
    for item in data:
        try:
            nombre = item.get("productName")
            precio = item.get("items")[0]["sellers"][0]["commertialOffer"]["Price"]
            
            resultados.append({
                "nombre": nombre,
                "precio": precio,
                "supermercado": "SuperTop"
            })
        except:
            pass
    
    return resultados
