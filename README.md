# Luminaria

Luminaria is a feature-rich blog application built with Django, CSS, JavaScript, and HTML. It demonstrates a complete blogging platform with modern best practices, optimized for SEO, usability, and extensibility.A lot of resources were used during the process of building this site, mostly Django 5 by Example/ Antonio Melé, documentation and so on . 


## Features

- **Data Models, Views, and URLs**  
  Robust and well-structured Django models, views, and URL routing to handle blog posts, comments, tags, and more.

- **Django Admin Site**  
  Full-featured administration interface to manage posts, comments, tags, and users effortlessly.

- **SEO-Friendly URLs & Canonical URLs**  
  Posts have clean, human-readable, and SEO-optimized URLs with canonical URL support to improve search engine ranking.

- **Post Pagination**  
  Efficient pagination of blog posts to enhance user experience and performance.

- **Class-Based Views**  
  Uses Django's class-based views for better modularity and reusable logic.

- **Email Sharing & Comment System**  
  Forms allowing readers to share posts via email and comment on posts using model forms.

- **Tagging System with `django-taggit`**  
  Adds tags to posts for better categorization and discoverability.

- **Similar Posts Recommendation**  
  Recommends related posts based on shared tags to keep readers engaged.

- **Custom Template Tags & Filters**  
  Includes template tags for displaying latest posts and most commented posts, plus a custom filter to render Markdown content beautifully.

- **Sitemap and RSS Feed**  
  Automatically generated sitemap and RSS feed to improve SEO and enable content syndication.

- **Full-Text Search with PostgreSQL**  
  Implements advanced full-text search using PostgreSQL’s trigram similarity for fast and relevant search results.

## Technology Stack

- Django (Python web framework)  
- PostgreSQL (Database & Full-text search)  
- HTML, CSS, JavaScript (Frontend/UI)  
- django-taggit (Tagging support)  

## Installation

1. Clone this repository:  
   ```bash
   git clone https://github.com/yourusername/luminaria.git
   cd luminaria
   ```
2.Create and activate a virtual environment:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3.Install dependencies:
  ```bash
 pip install -r requirements.txt
   ```
4.Configure your database (PostgreSQL) and update settings.py.

5.Apply migrations and create a superuser:
  ```bash
   python manage.py migrate
  python manage.py createsuperuser
   ```
6.Run the development server:
  ```bash
  python manage.py runserver
   ```



If you want, I can also help you generate a `requirements.txt` or detailed setup instructions. Just ask!

## Images
## 1.Home page
![image](https://github.com/user-attachments/assets/8a5455b6-738f-43e3-b7db-b46103f2e435)

## 2.Blog List
![image](https://github.com/user-attachments/assets/be8928ca-8f24-4c13-b138-02fb4b304980)

## 3.Blog
![image](https://github.com/user-attachments/assets/e7c8651e-f209-4d60-b51a-c9ffaeb83824)

## 4.Similar Posts,Comment,Add a comment
![image](https://github.com/user-attachments/assets/dcac33a4-e7e2-4ea4-a7ff-2f5e1197f348)

## 5.Share page
![image](https://github.com/user-attachments/assets/29e7699d-5226-4347-9cb6-1306ca15b6c9)









