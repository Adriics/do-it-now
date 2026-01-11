


self.addEventListener('push', event => {
    const data = event.data.json()

    console.log("PUSH recibido en SW: ", data)

    const title = data.title || "Notificación"
    const options = {
        body: data.body || "",
        data : { url: data.link || "/"},
    }

    event.waitUntil(self.registration.showNotification(title, options))


})

self.addEventListener("notificationClick", event => {
    event.notification.close()

    const url = event.notification.data.url

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (let client of windowClients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus()
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url)
            }
        })
    )
})