def is_palindrome(word):
    word = word.lower()
    return word == word[::-1]
