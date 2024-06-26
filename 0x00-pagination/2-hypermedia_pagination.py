#!/usr/bin/env python3
"""This a  method that takes the same arguments (and defaults) as get_page and
returns a dictionary of key/value pairs"""


import csv
import math
from typing import List, Dict, Tuple


class Server:
    """This a server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """This return specified page of dataset according to pagination parameters
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = self.index_range(page, page_size)
        return self.dataset()[start_index:end_index]

    def index_range(self, page: int, page_size: int) -> Tuple[int, int]:
        """This return a tuple containing the start index and end index for
        pagination"""
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size)

        if page > total_pages:
            return 0, 0
        else:
            start_index = (page - 1) * page_size
            end_index = min(start_index + page_size, total_items)
            return start_index, end_index

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """This returns a dictionary containing hypermedia information for
        pagination"""
        data = self.get_page(page, page_size)
        next_page_data = self.get_page(page + 1, page_size)
        next_page = page + 1 if len(next_page_data) > 0 else None
        prev_page = page - 1 if page > 1 else None
        total_pages = math.ceil(len(self.dataset()) / page_size)

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }


if __name__ == "__main__":
    server = Server()
