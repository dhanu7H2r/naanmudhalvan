class BankAccount:
  def __init__(self, account_number, account_holder_name, initial_balance=0.0):
      self.__account_number = account_number
      self.__account_holder_name = account_holder_name
      self.__account_balance = initial_balance

  def deposit(self, amount):
      if amount > 0:
          self.__account_balance += amount
          print(f"Deposited ${amount}. New balance: ${self.__account_balance:.2f}")
      else:
          print("Invalid deposit amount. Amount must be greater than zero.")

  def withdraw(self, amount):
      if 0 < amount <= self.__account_balance:
          self.__account_balance -= amount
          print(f"Withdrew ${amount}. New balance: ${self.__account_balance:.2f}")
      elif amount > self.__account_balance:
          print("Insufficient funds. Withdrawal amount exceeds the account balance.")
      else:
          print("Invalid withdrawal amount. Amount must be greater than zero.")

  def display_balance(self):
      print(f"Account Number: {self.__account_number}")
      print(f"Account Holder: {self.__account_holder_name}")
      print(f"Account Balance: ${self.__account_balance:.2f}")

# Create a BankAccount instance
account = BankAccount("12345", "John Doe", 1000.0)

# Test deposit and withdrawal
account.display_balance()
account.deposit(500.0)
account.withdraw(200.0)
account.withdraw(1500.0)
