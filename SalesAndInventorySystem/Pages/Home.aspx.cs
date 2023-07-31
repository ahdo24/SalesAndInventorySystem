using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace SalesAndInventorySystem.Pages
{
    public partial class Home : System.Web.UI.Page
    {
        private static string connDB = ConfigurationManager.AppSettings["dbConn"];


        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [WebMethod]
        public static string GetData()
        {
            DataTable dt = new DataTable();
            string sp = "GET_INVENTORY";

            string error_msg = "";

            try
            {
                using (SqlConnection con = new SqlConnection(connDB))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(sp, con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    dt.Load(cmd.ExecuteReader());
                    con.Close();
                }
            }
            catch (Exception)
            {
                throw;
                error_msg = "Error In Fetching the Inventory";
            }

            if (error_msg == "") {
                return JsonConvert.SerializeObject(dt);
            } else {
                return JsonConvert.SerializeObject(error_msg);
            }
        }


    }
}