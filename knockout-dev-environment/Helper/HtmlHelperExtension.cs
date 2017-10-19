using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace knockout_dev_environment
{
    public static class HtmlHelperExtension
    {
        public static string Render(this HtmlHelper HtmlHelper, string name)
        {
            return "test";
        }

        public static string test(this string str, string g)
        {
            return "s";
        }
    }

   
}