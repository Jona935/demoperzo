# Claude Bubble — App Android

Burbuja flotante con el monito de Claude que flota sobre cualquier app. Al tocarlo abre claude.ai usando **tu suscripción existente** — sin API key.

## Características
- Ícono del monito de Claude como burbuja flotante y arrastrable
- Botón **X** en la esquina de la burbuja para cerrarla directamente
- Chat completo de claude.ai en WebView (usa tu cuenta, Pro, Teams, etc.)
- Sesión persistente — inicia sesión una vez y queda guardada
- Funciona mientras usas otras apps

## Cómo instalar

### Requisitos
- Android 8.0 (API 26) o superior
- Android Studio para compilar desde el código fuente
- Cuenta de claude.ai (cualquier plan, incluyendo gratuito)

### Compilar con Android Studio
1. Abre Android Studio → **Open** → selecciona la carpeta `claude-bubble-android`
2. Espera que Gradle descargue las dependencias (~1-2 min)
3. Conecta tu teléfono con **Depuración USB** activada
   (Configuración → Acerca del teléfono → toca "Número de compilación" 7 veces → Opciones de desarrollador → Depuración USB)
4. Pulsa ▶ **Run**

### Primer uso
1. Abre la app **Claude Bubble**
2. Pulsa **"Activar burbuja flotante"**
3. Concede el permiso **"Mostrar sobre otras apps"** cuando lo pida
4. Concede permiso de **notificaciones** si Android 13+
5. Minimiza la app — verás el monito de Claude flotando en pantalla
6. Toca el monito → se abre claude.ai → inicia sesión con tu cuenta
7. A partir de ahora la sesión queda guardada
8. Para cerrar la burbuja: toca la **X** en la esquina del monito

## Permisos
| Permiso | Motivo |
|---|---|
| Mostrar sobre otras apps | Para la burbuja flotante |
| Notificaciones | Para mantener el servicio activo en segundo plano |
| Internet | Para cargar claude.ai |

## Estructura
```
app/src/main/java/com/claudebubble/
├── MainActivity.kt          — Pantalla principal
├── FloatingBubbleService.kt — Servicio con la burbuja flotante y botón X
├── ChatActivity.kt          — WebView de claude.ai
└── Message.kt / Prefs.kt   — Utilidades (no usadas en modo WebView)
```
