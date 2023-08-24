using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Services;
using static SalesAndInventorySystem.Master_page;

namespace SalesAndInventorySystem.Pages
{
    public class ItemDetails
    {
        public string item_id { set; get; }
        public string item_code { set; get; }
        public string item_desc { set; get; }
        public string item_price { set; get; }
        public string item_qty { set; get; }
    }


    public partial class Home : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [WebMethod]
        public static string GetData()
        {
            DataTable dt = new DataTable();
            Database db = new Database();

            string sp = "GET_INVENTORY";

            string error_msg = "";

            try
            {
                using (SqlConnection con = new SqlConnection(db.connDB))
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



        [WebMethod]
        public static string Login(Parameters param)
        {
            Database db = new Database();
            param.sp = "LOGIN_ACCOUNT";

            DataTable dt = db.GetData(param);

            if(dt.Rows.Count > 0)
            {
                int ctr = 0;
                foreach(DataColumn col in dt.Columns)
                {
                    string column = col.ToString().ToUpper();
                    var row = dt.Rows[0][ctr].ToString();

                    HttpContext.Current.Session[column] = row;

                    ctr++;
                }
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return JsonConvert.SerializeObject("invalid");
            }

        }

        [WebMethod]
        public static void Logout()
        {
            HttpContext.Current.Session.Clear();
            HttpContext.Current.Session.Abandon();
            HttpContext.Current.Response.Cookies.Clear();
            HttpContext.Current.Response.Cache.SetNoStore();
        }


    }
}