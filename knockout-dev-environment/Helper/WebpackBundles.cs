using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace knockout_dev_environment
{
    public class WebpackBundles
    {
        private static readonly string relativePathOfClientDist = "/ClientApp/dist";
        private string _virtualPathOfClientDist = $"~{relativePathOfClientDist}";
        // internal for unit tests, at runtime uses HttpContext.Current
        private HttpContextBase _context;
        internal HttpContextBase Context
        {
            get
            {
                return _context ?? new HttpContextWrapper(HttpContext.Current);
            }
            set
            {
                _context = value;
            }
        }

        public IHtmlString RenderScript(string entryName)
        {
            return this.Render($"{entryName}.*.js", @"<script src = ""{0}/{1}/{2}""></script>");
        }
        private IHtmlString Render(string searchFilePattern, string outputTagFormat)
        {
            string physicalDirPath = Context.Server.MapPath(_virtualPathOfClientDist);
            string[] subDirPaths = Directory.GetDirectories(physicalDirPath);
            foreach(var subDirPath in subDirPaths)
            {
                string filePath = Directory.EnumerateFiles(subDirPath, searchFilePattern).FirstOrDefault();
                if (File.Exists(filePath))
                {
                    DirectoryInfo dirInfo = new DirectoryInfo(subDirPath);
                    FileInfo fileInfo = new FileInfo(filePath);
                    IHtmlString htmlString = new HtmlString(string.Format(outputTagFormat, relativePathOfClientDist, dirInfo.Name, fileInfo.Name));
                    return htmlString;
                }
            }

            throw new ApplicationException("can not find webpack bundle file");
        }
        public IHtmlString RenderStyle(string entryName)
        {
            return this.Render($"{entryName}.*.css", @"<link type=""text/css"" rel=""stylesheet"" href = ""{0}/{1}/{2}""></script>");
        }
    }

    public class WebpackBundlesFactory
    {
        public static WebpackBundles Create()
        {
            return new WebpackBundles();
        }
    }



   
}