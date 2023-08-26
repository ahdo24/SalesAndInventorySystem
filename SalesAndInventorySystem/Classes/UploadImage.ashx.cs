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

                var sp = HttpContext.Current.Request.Params["sp"];

                // database record update logic here  ()
                // Input Text
                param.input_code = HttpContext.Current.Request.Params["input_code"];
                param.input_desc = HttpContext.Current.Request.Params["input_desc"];
                param.input_price = HttpContext.Current.Request.Params["input_price"];
                param.input_qty = HttpContext.Current.Request.Params["input_qty"];
                param.sp = HttpContext.Current.Request.Params["sp"];
                param.input_image = HttpContext.Current.Request.Params["filename"];

                if (sp == "INSERT_INVENTORY")
                {
                    var folder = HttpContext.Current.Request.Params["folder"];

                    // Insert in image in directory
                    foreach (string s in context.Request.Files)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        fileName = HttpContext.Current.Request.Params["filename"];
                        filePath = HttpContext.Current.Server.MapPath(Path.Combine("~/" + folder + "/"));

                        if (!Directory.Exists(filePath))
                            Directory.CreateDirectory(filePath);
                        
                        if (!string.IsNullOrEmpty(fileName))
                        {
                            fileExtension = Path.GetExtension(fileName);
                            str_file = fileName;
                            file.SaveAs(filePath + str_file);
                        }
                    }
                }
                if (sp == "UPDATE_INVENTORY")
                {
                    var folder = HttpContext.Current.Request.Params["folder"];
                    param.input_id = HttpContext.Current.Request.Params["id"];

                    var xxxxxxx = HttpContext.Current.Request.Params["hasNewImage"];

                    if (HttpContext.Current.Request.Params["hasNewImage"] == "true") // update and append the new image the file
                    {
                        var original_file = HttpContext.Current.Request.Params["oringinal"];
                        filePath = HttpContext.Current.Server.MapPath(Path.Combine("~/" + folder + "/"));

                        var path = HttpContext.Current.Server.MapPath("~/" + folder + "/");
                        var fileCount = Directory.GetFiles(path, "*", SearchOption.TopDirectoryOnly).Length;
                        var File = HttpContext.Current.Server.MapPath("~/" + folder + "/" + original_file);

                        if (fileCount > 0) // Delete the old image
                        {
                            FileInfo f = new FileInfo(File);
                            if (f.Exists)
                                f.Delete();
                        }

                        foreach (string s in context.Request.Files) // insert the updated image
                        {
                            HttpPostedFile file = context.Request.Files[s];
                            fileName = HttpContext.Current.Request.Params["filename"];

                            if (!Directory.Exists(filePath))
                                Directory.CreateDirectory(filePath);

                            if (!string.IsNullOrEmpty(fileName))
                            {
                                fileExtension = Path.GetExtension(fileName);
                                str_file = fileName;
                                file.SaveAs(filePath + str_file);
                            }
                        }

                    }
                }


                db.InsertData(param);


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