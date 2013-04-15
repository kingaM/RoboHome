using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using System.Xml.Linq;
using System.Runtime.Serialization.Json;
using System.Collections.ObjectModel;
using Newtonsoft.Json;
using System.IO;
using System.Text;

namespace JSONParsingExample
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
            myButton.Click += new RoutedEventHandler(myButton_Click);
        }
        void myButton_Click(object sender, RoutedEventArgs e)
        {


            try
            {
                WebClient webClient = new WebClient();
                Uri uri = new Uri("http://robohome.co.uk/state.txt");
                webClient.OpenReadCompleted += new OpenReadCompletedEventHandler(webClient_OpenReadCompleted);
                webClient.OpenReadAsync(uri);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message + "error came here 1");
            }
        }
        void webClient_OpenReadCompleted(object sender, OpenReadCompletedEventArgs e)
        {


            DataContractJsonSerializer ser = null;
            try
            {
                ser = new DataContractJsonSerializer(typeof(ObservableCollection<RootObject>));
                ObservableCollection<RootObject> employees = ser.ReadObject(e.Result) as ObservableCollection<RootObject>;
                foreach (RootObject em in employees)
                {
                    string id = em.name;
                    //string nm = em.GetRoot.Customer.CustomerID;
                    lstEmployee.Items.Add("<" + id + ">");
                    foreach (var error in em.items)
                    {
                        lstEmployee.Items.Add(">>" + error.name + " (State: " + error.state + " )");
                    }
                    lstEmployee.Items.Add(" ");
                }



            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message + "error came here 2" + ex.StackTrace);
            }


        }
        public class Item
        {
            public string itemType { get; set; }
            public string ip { get; set; }
            public string brand { get; set; }
            public int state { get; set; }
            public int id { get; set; }
            public string name { get; set; }
        }

        public class RootObject
        {
            public List<Item> items { get; set; }
            public int id { get; set; }
            public string name { get; set; }
        }
    }
}