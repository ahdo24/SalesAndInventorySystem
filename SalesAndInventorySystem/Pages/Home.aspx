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
                    <th>Desc</th>
                    <th>Price</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <img src="../Images/Claw-hammer.jpg" width="200" loading="lazy"  />
                    </td>
                    <td>Hammer</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                 <tr>
                    <td>
                        <img src="../Images/DeWalt 20V.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Drill</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>
                        <img src="../Images/Screw.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Screww</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>
                        <img src="../Images/MilwaukeeM12.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Screww</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                                <tr>
                    <td>
                        <img src="../Images/Claw-hammer.jpg" width="200" loading="lazy"  />
                    </td>
                    <td>Hammer</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                 <tr>
                    <td>
                        <img src="../Images/DeWalt 20V.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Drill</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>
                        <img src="../Images/Screw.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Screww</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>
                        <img src="../Images/MilwaukeeM12.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Screww</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                                <tr>
                    <td>
                        <img src="../Images/Claw-hammer.jpg" width="200" loading="lazy"  />
                    </td>
                    <td>Hammer</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                 <tr>
                    <td>
                        <img src="../Images/DeWalt 20V.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Drill</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>
                        <img src="../Images/Screw.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Screww</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>
                        <img src="../Images/MilwaukeeM12.jfif" width="200" loading="lazy"  />
                    </td>
                    <td>Screww</td>
                    <td>100</td>
                    <td>5</td>
                </tr>
            </tbody>
        </table>
    </div>


</asp:Content>



<%-- JS --%>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    
        <script src="../Links/JS/Home.js"></script>

</asp:Content>
