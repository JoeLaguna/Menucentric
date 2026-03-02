export const config = {
    // Proteger todas las rutas
    matcher: '/(.*)',
};

export default function middleware(request) {
    const authorizationHeader = request.headers.get('authorization');

    if (authorizationHeader) {
        const basicAuth = authorizationHeader.split(' ')[1];
        const [user, pwd] = atob(basicAuth).split(':');

        // 🔒 Cambia aquí el usuario y la contraseña que quieras usar
        if (user === 'jose' && pwd === 'menu123') {
            // Credenciales correctas: permite al usuario ver la aplicación
            return;
        }
    }

    // Si no hay contraseña o es incorrecta, mostramos el diálogo del navegador
    return new Response('Acceso denegado', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Menucentro Privado"',
        },
    });
}
