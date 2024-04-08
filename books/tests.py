from django.test import TestCase
from books.models import Meeting, User
from django.urls import reverse

# Create your tests here.


class HomePageTest(TestCase):

    def test_home_page_returns_its_html(self):
        response = self.client.get("/")
        self.assertTemplateUsed(response, "home.html")

    def test_url_available_by_name(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)


class NewMeetingTest(TestCase):
    def test_can_create_a_new_meeting(self):
        pavlos = User(first_name="Pavlos")
        pavlos.save()
        meeting = Meeting()
        meeting.meeting_date = "2024-04-10"
        meeting.occured = False
        meeting.host = pavlos
        meeting.location = "Balsham"
        meeting.save()
