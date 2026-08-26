try:
    (LRUCache)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__c__ = LRUCache(2)
__c__.put(1, 1)
__c__.put(2, 2)
__case__("get(1) after put(1,1), put(2,2)", 1, __c__.get(1))
__c__.put(3, 3)
__case__("get(2) after put(3,3) -- 2 was least recently used", -1, __c__.get(2))
__case__("get(3) after put(3,3)", 3, __c__.get(3))
__c__.put(4, 4)
__case__("get(1) after put(4,4) -- reading 3 saved it, so 1 went", -1, __c__.get(1))
__case__("get(3) after put(4,4)", 3, __c__.get(3))
__case__("get(4) after put(4,4)", 4, __c__.get(4))
__case__("get(99) on a key never stored", -1, __c__.get(99))

__u__ = LRUCache(1)
__u__.put(5, 5)
__u__.put(5, 9)
__case__("get(5) after put(5,5) then put(5,9) -- an update, not an insert", 9, __u__.get(5))
