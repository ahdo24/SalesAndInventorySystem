<%@ Page Title="" Language="C#" MasterPageFile="~/Master_page.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="SalesAndInventorySystem.Pages.Home" %>
<%-- CSS --%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Links/CSS/Home.css" rel="stylesheet" />
</asp:Content>


<%-- HTML / CONTENT --%>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        
    <div class="sales_con">
        <table class="sales_and_inventory">
            <thead style="display:none">
                <tr>
                    <th>Image</th>
                    <th>Item Details</th>
                </tr>
            </thead>
            <tbody>

                 <tr class="add_btn">
                    <td>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </td>
                    <td></td>
                </tr>
               
            </tbody>
        </table>
    </div>


</asp:Content>



<%-- JS --%>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="../Links/JS/Home.js"></script>
    
</asp:Content>
