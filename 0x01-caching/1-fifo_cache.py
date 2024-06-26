#!/usr/bin/env python3
"""This is for a newly caching system"""
from collections import deque
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """This is for a caching system"""
    def __init__(self):
        """This initializes the class"""
        super().__init__()
        self.keys = deque()

    def put(self, key, item):
        """This is the put method"""
        if key is not None and item is not None:
            if key in self.cache_data:
                self.keys.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key = self.keys.popleft()
                self.cache_data.pop(discarded_key)
                print(f'DISCARD: {discarded_key}')
            self.cache_data[key] = item
            self.keys.append(key)

    def get(self, key):
        """This gets the key"""
        return self.cache_data.get(key, None)
