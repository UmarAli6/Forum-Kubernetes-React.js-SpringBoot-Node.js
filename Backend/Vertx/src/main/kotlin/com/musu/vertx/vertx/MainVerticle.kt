package com.musu.vertx.vertx

import io.vertx.core.AbstractVerticle
import io.vertx.core.Promise
import io.vertx.core.http.HttpServer
import io.vertx.ext.web.Router

lateinit var server: HttpServer
lateinit var router: Router

class MainVerticle : AbstractVerticle() {

  override fun start(startPromise: Promise<Void>) {

    connectDatabase()

    server = vertx.createHttpServer()
    router = Router.router(vertx)

    // Routes
    routes()

    server.requestHandler(router).listen(8084)
  }
}
