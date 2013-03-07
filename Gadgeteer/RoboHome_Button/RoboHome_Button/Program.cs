using System;
using System.Collections;
using System.Threading;
using Microsoft.SPOT;
using Microsoft.SPOT.Presentation;
using Microsoft.SPOT.Presentation.Controls;
using Microsoft.SPOT.Presentation.Media;
using Microsoft.SPOT.Touch;

using Gadgeteer.Networking;
using GT = Gadgeteer;
using GTM = Gadgeteer.Modules;
using Gadgeteer.Modules.GHIElectronics;
using GHI.Premium.Net;

namespace RoboHome_Button
{
    public partial class Program
    {

        String ssid = "ssid";
        String password = "password";

        String sensorState = "off";

        // This method is run when the mainboard is powered up or reset.   
        void ProgramStarted()
        {
            GT.Timer t = new GT.Timer(1000);
            t.Tick += new GT.Timer.TickEventHandler(connect);
            t.Start();

            Debug.Print("Program Started");
        }

        void connect(GT.Timer timer)
        {
            timer.Stop();

            wifi.Interface.Open();
            wifi.Interface.NetworkInterface.EnableDhcp();

            WiFiNetworkInfo[] scanResults = wifi.Interface.Scan(ssid);

            foreach (WiFiNetworkInfo result in scanResults)
            {
                wifi.Interface.Join(result, password);
                Debug.Print("Network Joined");
                break;
            }
            run();
        }

        void run()
        {
            button.ButtonPressed += new Button.ButtonEventHandler(button_ButtonPressed);

            string ipAddress = wifi.Interface.NetworkInterface.IPAddress;
            WebServer.StartLocalServer(ipAddress, 80);
            WebEvent empty = WebServer.SetupWebEvent("index.html");
            empty.WebEventReceived += new WebEvent.ReceivedWebEventHandler(empty_WebEventReceived);
            WebEvent state = WebServer.SetupWebEvent("state");
            state.WebEventReceived += new WebEvent.ReceivedWebEventHandler(state_WebEventReceived);
        }

        void empty_WebEventReceived(string path, WebServer.HttpMethod method, Responder responder)
        {
            responder.Respond("This is a RoboHome module and should be accessed using the API");
        }

        void state_WebEventReceived(string path, WebServer.HttpMethod method, Responder responder)
        {
            responder.Respond(sensorState);
        }

        void button_ButtonPressed(Button sender, Button.ButtonState state)
        {
            sensorState = (sensorState.Equals("off")) ? "on" : "off";
            Debug.Print(sensorState);
            //PUTContent emptyPut = new PUTContent();
            //Gadgeteer.Networking.HttpRequest req = HttpHelper.CreateHttpPutRequest("url", emptyPut, null);
        }
    }
}
