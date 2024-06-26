#!/usr/bin/env python3
"""This is for a newly caching system"""
from collections import OrderedDict
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """This is for the caching system"""
    def __init__(self):
        """This initializes the class"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """This is the put method"""
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data.move_to_end(key)
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                discarded_key = next(iter(self.cache_data))
                self.cache_data.pop(discarded_key)
                print(f'DISCARD: {discarded_key}')

    def get(self, key):
        """This gets the key"""
        if key is not None and key in self.cache_data:
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
        return None
