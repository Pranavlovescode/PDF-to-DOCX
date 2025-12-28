# FROM python:3.11-slim

# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# WORKDIR /app

# RUN apt-get update && apt-get install -y gcc \
#     && rm -rf /var/lib/apt/lists/*

# COPY requirements.txt .
# RUN pip install --upgrade pip && pip install -r requirements.txt

# COPY . .

# RUN python manage.py collectstatic --noinput

# CMD ["gunicorn", "pdftodocx.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]



# Base Image (Linux)

FROM python:3.11-slim

# Environment Variables

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


# Working Directory

WORKDIR /app

# System Dependencies

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Python Dependencies

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Project Files

COPY . .

# Expose Render Port

EXPOSE 8000

# Start Django via Gunicorn

CMD ["gunicorn", "pdftodocx.wsgi:application", "--bind", "0.0.0.0:8000"]
