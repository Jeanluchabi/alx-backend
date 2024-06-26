#!/usr/bin/env python3
"""This is for base caching system"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """This is for a caching system"""
    def __init__(self):
        """init function"""
        super().__init__()

    def put(self, key, item):
        """This adds into the cache"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """This gets the key"""
        return self.cache_data.get(key, None)
