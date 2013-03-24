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

namespace RoboHome_LightSensor
{
    public partial class Program
    {

        String ssid = "ssid";
        String password = "password";
        String rpi = "192.168.0.120";

        String sensorState = "0";

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
            string ipAddress = wifi.Interface.NetworkInterface.IPAddress;
            WebServer.StartLocalServer(ipAddress, 80);
            WebEvent empty = WebServer.SetupWebEvent("index.html");
            empty.WebEventReceived += new WebEvent.ReceivedWebEventHandler(empty_WebEventReceived);
            WebEvent state = WebServer.SetupWebEvent("state");
            state.WebEventReceived += new WebEvent.ReceivedWebEventHandler(state_WebEventReceived);

            Thread t = new Thread(new ThreadStart(pollLight));
            t.Start();
        }

        void empty_WebEventReceived(string path, WebServer.HttpMethod method, Responder responder)
        {
            responder.Respond("This is a RoboHome module and should be accessed using the API");
        }

        void state_WebEventReceived(string path, WebServer.HttpMethod method, Responder responder)
        {
            responder.Respond(sensorState);
        }

        void pollLight()
        {
            while (true)
            {
                double lightPercent = lightSensor.ReadLightSensorPercentage();
                Debug.Print(lightPercent.ToString());
                String newState = (lightPercent >= 50) ? "1" : "0";
                Debug.Print(newState);
                if (!sensorState.Equals(newState))
                {
                    sensorState = newState;
                    Debug.Print(sensorState);
                    PUTContent emptyPut = new PUTContent();
                    Gadgeteer.Networking.HttpRequest req = HttpHelper.CreateHttpPutRequest("http://" + rpi + ":9090/gadgeteer/state/" + sensorState + "/", emptyPut, null);
                    req.SendRequest();
                }
                Thread.Sleep(1000);
            }
        }
    }
}
