namespace HappyIndex.Host.Fsharp

open System.Collections.Generic
open System.Web.Http
 
type QuestionsController() =
    inherit ApiController()
 
    member this.Get() = 
        "hello"