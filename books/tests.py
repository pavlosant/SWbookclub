from django.test import TestCase
from books.models import Meeting, User
from django.urls import reverse
from django.contrib.auth import get_user_model

# Create your tests here.


class HomePageTest(TestCase):

    def test_homepage(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "home.html")


class MeetingTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # cls.pavlos = User.objects.create(first_name="Pavlos")
        cls.pavlos = get_user_model().objects.create_user(
            username="pavlos", email="testuser@gmail.com", password="secret"
        )
        cls.meeting = Meeting.objects.create(
            meeting_date="2024-04-10",
            occured=False,
            host=cls.pavlos,
            location="Balsham",
        )

    def test_model_content(self):
        self.assertEqual(self.meeting.location, "Balsham")
        self.assertEqual(self.meeting.get_absolute_url(), "/meetings/1/")

    def test_meeting_listview(self):
        response = self.client.get(reverse("meetings"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Upcoming Meetings")
        self.assertTemplateUsed(response, "meetings.html")

    def test_meeting_detailview(self):
        response = self.client.get(
            reverse(
                "meeting_detail", kwargs={"pk": self.meeting.pk}
            )  # this is coming from our test self object above
        )
        no_response = self.client.get("/meetings/1000/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(no_response.status_code, 404)
        self.assertContains(response, "Balsham")
        self.assertTemplateUsed("meeting_detail.html")
