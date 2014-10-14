using System;
using System.IO;
using System.Web;
using System.Web.Routing;
using log4net;
using log4net.Config;

namespace HappyPortal
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            var configFilePath = HttpContext.Current.Server.MapPath("log4net.config");
            XmlConfigurator.ConfigureAndWatch(new FileInfo(configFilePath));
        }

        private static readonly ILog Log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected void Application_Error(object sender, EventArgs e)
        {
            var httpException = Server.GetLastError().GetBaseException() as HttpException;
            if (httpException != null)
            {
                Log.Error(string.Format("HttpCode={0}, Url={1}", httpException.GetHttpCode(), Request.RawUrl), httpException);
            }
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            
        }
    }
}