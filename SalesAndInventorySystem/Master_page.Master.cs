using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Web.Services;

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

            // Login
            public string login_email { set; get; }
            public string login_pass { set; get; }

        }

        public class Database
        {
            // Database Connection
            public string connDB = ConfigurationManager.AppSettings["dbConn"];

            #region Insert Data from Database
            

            public DataTable InsertData(Parameters param)
            {
                DataTable dt = new DataTable();

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

                        SQLParam(cmd, param);

                        dt.Load(cmd.ExecuteReader());

                        tran.Commit();
                        con.Close();

                    }
                }
                catch(Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }

                return dt;
                
            }

            #endregion



            #region Get Data
            public DataTable GetData(Parameters param)
            {
                DataTable dt = new DataTable();

                string sp = param.sp;
                SqlTransaction tran = null;

                try
                {
                    using (SqlConnection con = new SqlConnection(connDB))
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand(sp, con);
                        cmd.CommandType = CommandType.StoredProcedure;

                        tran = con.BeginTransaction();
                        cmd.Transaction = tran;

                        SQLParam(cmd, param);

                        dt.Load(cmd.ExecuteReader());

                        tran.Commit();
                        con.Close();
                    }
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }

                return dt;


            }


            #endregion



            #region Parameters
            public void SQLParam(SqlCommand cmd, Parameters param)
            {
                string sp = param.sp;

                if (sp == "INSERT_INVENTORY")
                {
                    cmd.Parameters.AddWithValue("@CODE", param.input_code);
                    cmd.Parameters.AddWithValue("@DESC", param.input_desc);
                    cmd.Parameters.AddWithValue("@PRICE", param.input_price);
                    cmd.Parameters.AddWithValue("@QTY", param.input_qty);
                    cmd.Parameters.AddWithValue("@IMAGE", param.input_image);

                }

                if (sp == "LOGIN_ACCOUNT")
                {
                    cmd.Parameters.AddWithValue("@USER", param.login_email);
                    cmd.Parameters.AddWithValue("@PASS", param.login_pass);

                }



            }

            #endregion
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }





    }
}