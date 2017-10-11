using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(knockout_dev_environment.Startup))]
namespace knockout_dev_environment
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
