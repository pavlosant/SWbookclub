from django.test import TestCase
from books.models import Meeting, User
from django.urls import reverse

# Create your tests here.


class HomePageTest(TestCase):

    def test_homepage(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "home.html")


class MeetingTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.pavlos = User.objects.create(first_name="Pavlos")
        cls.meeting = Meeting.objects.create(
            meeting_date="2024-04-10",
            occured=False,
            host=cls.pavlos,
            location="Balsham",
        )

    def test_model_content(self):
        self.assertEqual(self.meeting.location, "Balsham")


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
