import unittest
from robohome.priorityQueue import MyPriorityQueue
import Queue

class TestMyPriorityQueue(unittest.TestCase):

    def test_put(self):
        queue = MyPriorityQueue()
        queue.put(1, 1, "open")

    def test_get(self):
        queue = MyPriorityQueue()
        queue.put(1, 1, "open")
        self.assertEqual(queue.get(), (1, 1, "open", []))

    def test_get_multipleElementsWithDifferentPriorities(self):
        queue = MyPriorityQueue()
        queue.put(1, 1, "close")
        queue.put(1, 1, "open")
        self.assertEqual(queue.get(), (1, 1, "close", []))
        self.assertEqual(queue.get(), (1, 1, "open", []))

    def test_get_emptyQueue(self):
        queue = MyPriorityQueue()
        self.assertRaises(Queue.Empty, queue.get, False)