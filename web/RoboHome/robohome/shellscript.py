import subprocess 
import os


def callScript():
    subprocess.call("sh ../../../Scripts/test.sh", shell=True)

def getPID():
    processID = os.getpid()
    return processID

def main():
    processID = getPID()
    with open('robohome.pid', 'w') as f:
        f.write(str(processID))
    run = callScript()

if __name__ == '__main__':
    main()

    