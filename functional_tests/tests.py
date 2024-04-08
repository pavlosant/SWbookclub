from selenium import webdriver
from django.test import LiveServerTestCase


class NewVisitorTest(LiveServerTestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()

    def tearDown(self):
        self.browser.quit()

    # def test_can_start_a_todo_list(self):
    # Edith has heard about a cool new online to-do app.
    # She goes to check out its homepage
    #    self.browser.get(self.live_server_url)

    # She notices the page title and header mention to-do lists
    #    self.assertIn("Book Club", self.browser.title)
    # header_text = self.browser.find_element(By.TAG_NAME, "h1").text
    # self.assertIn("To-Do", header_text)

    # She is invited to enter a to-do item straight away
    # inputbox = self.browser.find_element(By.ID, "id_new_item")
    # self.assertEqual(inputbox.get_attribute("placeholder"), "Enter a to-do item")

    # She types "Buy peacock feathers" into a text box
    # (Edith's hobby is tying fly-fishing lures)
    # inputbox.send_keys("Buy peacock feathers")
