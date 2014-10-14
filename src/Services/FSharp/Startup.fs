namespace HappyIndex.Host.Fsharp

open Owin
open System.Web.Http
 
type Startup() =
    member this.Configuration(app : IAppBuilder) = 
        let config = new HttpConfiguration()
        let route = config.Routes.MapHttpRoute(
                                                "Default", 
                                                "api/{controller}/{id}" )
        route.Defaults.Add("id", RouteParameter.Optional )
 
        app.UseWebApi(config) |> ignore


