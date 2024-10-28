# backend/Dockerfile

# Base image for Python
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create a working directory and copy the requirements file
WORKDIR /app
COPY requirements.txt /app/

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the Django application files
COPY . /app/

# Collect static files and run the server
RUN python manage.py collectstatic --noinput
# backend/Dockerfile

# Run migrations and create superuser
CMD ["sh", "-c", "python manage.py migrate && python create_superuser.py && gunicorn --bind 0.0.0.0:8000 bookclub.wsgi:application"]

# Run gunicorn for production
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "bookclub.wsgi:application"]
