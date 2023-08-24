using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using static SalesAndInventorySystem.Master_page;

namespace SalesAndInventorySystem.Classes
{
    /// <summary>
    /// Summary description for UploadImage
    /// </summary>
    public class UploadImage : IHttpHandler
    {

       
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/json";
            Parameters param = new Parameters();
            Database db = new Database();

            try
            {
                string str_file = "";
                string fileName = "";
                string fileExtension = "";
                string filePath = "";
                var folder = HttpContext.Current.Request.Params["folder"];
                var sp = HttpContext.Current.Request.Params["sp"];


                // database record update logic here  ()
                // Input Text
                param.input_code = HttpContext.Current.Request.Params["input_code"];
                param.input_desc = HttpContext.Current.Request.Params["input_desc"];
                param.input_price = HttpContext.Current.Request.Params["input_price"];
                param.input_qty = HttpContext.Current.Request.Params["input_qty"];
                param.input_image = HttpContext.Current.Request.Params["filename"]; 
                param.sp = HttpContext.Current.Request.Params["sp"];

                if (sp == "INSERT_INVENTORY")
                {
                    db.InsertData(param);

                    // Insert in image in directory
                    foreach (string s in context.Request.Files)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        fileName = HttpContext.Current.Request.Params["filename"];
                        filePath = HttpContext.Current.Server.MapPath(Path.Combine("~/" + folder + "/"));

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        if (!string.IsNullOrEmpty(fileName))
                        {
                            fileExtension = Path.GetExtension(fileName);
                            str_file = fileName;
                            file.SaveAs(filePath + str_file);
                        }
                    }
                }

            }
            catch (Exception ac)
            {
                throw ac;
            }


        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

      


    }
}