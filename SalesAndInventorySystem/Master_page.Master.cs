using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace SalesAndInventorySystem
{
    public partial class Master_page : System.Web.UI.MasterPage
    {
        public class Parameters
        {

            // Global param
            public string sp { set; get; }

            // Inventory param
            public string input_code { set; get; }
            public string input_desc { set; get; }
            public string input_price { set; get; }
            public string input_qty { set; get; }
            public string input_image { set; get; }

        }

        public class Database
        {
            // Database Connection
            public string connDB = ConfigurationManager.AppSettings["dbConn"];

            #region Insert Data from Database
            

            public void InsertData(Parameters param)
            {
                string sp = param.sp;
                SqlTransaction tran = null;

                try
                {
                    using(SqlConnection con = new SqlConnection(connDB))
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand(sp, con);
                        cmd.CommandType = CommandType.StoredProcedure;

                        tran = con.BeginTransaction();
                        cmd.Transaction = tran;

                        if (sp == "INSERT_INVENTORY")
                        {
                            cmd.Parameters.AddWithValue("@CODE", param.input_code);
                            cmd.Parameters.AddWithValue("@DESC", param.input_desc);
                            cmd.Parameters.AddWithValue("@PRICE", param.input_price);
                            cmd.Parameters.AddWithValue("@QTY", param.input_qty);
                            cmd.Parameters.AddWithValue("@IMAGE", param.input_image);

                        }

                        cmd.ExecuteNonQuery();

                        tran.Commit();
                        con.Close();

                    }
                }
                catch(Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }





            }


            #endregion


        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}