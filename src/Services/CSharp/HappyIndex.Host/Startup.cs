using Owin;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.FileSystems;

public class Startup
{
    public void Configuration(IAppBuilder app)
    {
        //app.UseFileServer(new FileServerOptions
        //{
        //    FileSystem = new PhysicalFileSystem(GetStaticContentPath()),
        //    RequestPath = new PathString("/assets")
        //});
        app.UseCors(CorsOptions.AllowAll);
        app.UseNancy();
    }

    public string GetStaticContentPath() {
        try
        {
            var fileSystem = new PhysicalFileSystem("/assets");
            return fileSystem.Root;
        }
        catch{
            var fileSystem = new PhysicalFileSystem("../../assets");
            return fileSystem.Root;
        }
    }
}