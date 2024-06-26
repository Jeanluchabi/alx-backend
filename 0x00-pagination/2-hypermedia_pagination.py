#!/usr/bin/env python3
"""
This adds `get_page` method to `Server` class
"""
import csv
from typing import List, Tuple, Dict, Any


class Server:
    """ It is a server class to paginate a database of popular baby names.
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

    @staticmethod
    def index_range(page: int, page_size: int) -> Tuple[int, int]:
        """This calculates start and end index range for a `page`, with `page_size`
        """
        nextPageStartIndex = page * page_size
        return nextPageStartIndex - page_size, nextPageStartIndex

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Get items for the given page number
        Args:
            page (int): page number
            page_size (int): number of items per page
        Returns:
            (List[List]): a list of list(row) if inputs are within range
            ([]) : an empty list if page and page_size are out of range
        """
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        startIndex, endIndex = self.index_range(page, page_size)
        return self.dataset()[startIndex:endIndex]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """Returns a dictionary of information"""
        indexes = self.index_range(page, page_size)
        info = {
            "page_size": page_size,
            "page": page,
            "data": self.get_page(page, page_size),
            "next_page": indexes[1],
            "prev_page": indexes[0],
            "total_pages": len(self.dataset()) // page_size
        }

        return info