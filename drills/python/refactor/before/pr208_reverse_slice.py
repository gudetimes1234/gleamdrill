def is_palindrome(word):
    backwards = ""
    for ch in word:
        backwards = ch + backwards
    return word.lower() == backwards.lower()
