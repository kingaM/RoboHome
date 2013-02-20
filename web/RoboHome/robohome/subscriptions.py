class SubscriptionManager:

    def __init__(self):
        self.listeners = []

    def addListener(self, listener):
        self.listeners.append(listener)

    def removeListener(self, listener):
        if listener in self.listeners:
            self.listeners.remove(listener)

    def notify(self, *args):
        for listener in self.listeners:
            listener(*args)
