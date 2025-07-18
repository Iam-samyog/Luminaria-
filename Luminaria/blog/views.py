from django.core.paginator import EmptyPage,Paginator,PageNotAnInteger
from django.shortcuts import render,get_object_or_404,redirect
from .models import Post
from django.views.generic import ListView
from .forms import EmailPostForm,CommentForm,SearchForm,ContactForm
from django.core.mail import send_mail
from django.views.decorators.http import require_POST
from taggit.models import Tag
from django.db.models import Count
from django.contrib import messages
from django.contrib.postgres.search import TrigramSimilarity

# Create your views here.
def home(request):
    return render(request, 'blog/home.html')

def about_view(request):
    return render(request, 'blog/about.html')

def post_list(request,tag_slug=None):
    post_list=Post.published.all()
    tag=None
    if tag_slug:
        tag=get_object_or_404(Tag,slug=tag_slug)
        post_list=post_list.filter(tags__in=[tag])
    #Pagination with 3 posts per page
    paginator=Paginator(post_list,4)
    page_number=request.GET.get('page',1)
    try:
        posts=paginator.page(page_number)
    except PageNotAnInteger:
        #If page is not the integer , the first page will be shown 
        posts=paginator.page(1) 
    except EmptyPage:
        #if the page number is out of range get the last page of results
        posts=paginator.page(paginator.num_pages)
        
    return render(
        request,
        'blog/post/list.html',
        {'posts':posts,
         'tag':tag
         }
    )

def post_detail(request,year,month,day,post):
    post=get_object_or_404(
        Post,
        status=Post.Status.PUBLISHED,
        slug=post,
        publish__year=year,
        publish__month=month,
        publish__day=day
    )
    #list of active comments for this post
    comments=post.comments.filter(active=True)
    #Form for users to comment
    form=CommentForm()
    
    #list of similar post
    post_tags_ids=post.tags.values_list('id',flat=True)
    similar_posts=Post.published.filter(
        tags__in=post_tags_ids
    ).exclude(id=post.id)
    similar_posts=similar_posts.annotate(
        same_tags=Count('tags')
        
    ).order_by('-same_tags','-publish')[:4]
    
    return render(
        request,
        'blog/post/detail.html',
        {
            'post':post,
            'comments':comments,
            'form':form,
            'similar_posts':similar_posts
         
         }
    )

class PostListView(ListView):
    """
    Alternative post list view
    
    
    """
    queryset=Post.published.all()
    context_object_name='posts'
    paginate_by=3
    template_name='blog/post/list.html'
    
def post_share(request,post_id):
    #Get post by id
    
    post=get_object_or_404(Post,id=post_id,status=Post.Status.PUBLISHED)
    sent=False
    
    if request.method == 'POST':
        #Form was submitted
        form=EmailPostForm(request.POST)
        if form.is_valid():
            #Form fields that are valid
            cd=form.cleaned_data
            #send email
            post_url=request.build_absolute_uri(
                post.get_absolute_url()
            )
            subject=(
                f"{cd['name']} "
                f"recommend you to read {post.title}"
                
            )
            message=(
                f"Read {post.title} at {post_url}\n\n"
                f"{cd['name']}\'s comments: {cd['comments']}"
            )
            send_mail(
                subject=subject,
                message=message,
                from_email=None,
                recipient_list=[cd['to']]
            )
            sent=True
    else:
        form=EmailPostForm()
    return render(
        request,
        'blog/post/share.html',
        {
            'post':post,
            'form':form,
            'sent':sent
        }
    )
    
@require_POST
def post_comment(request,post_id):
    post=get_object_or_404(
        Post,
        id=post_id,
        status=Post.Status.PUBLISHED
    )
    comment=None
    #A comment if posted
    form=CommentForm(data=request.POST)
    if form.is_valid():
        #Create a Comment object without saving it to the database
        
        comment=form.save(commit=False)
        #Assign the post to the comment
        comment.post=post
        #save the comment to the database
        comment.save()
    return render(
        request,
        'blog/post/comment.html',
        {
            'post':post,
            'form':form,
            'comment':comment
        }
    )

#search view
def post_search(request):
    form=SearchForm()
    query=None
    results=[]
    
    if 'query' in request.GET:
        form=SearchForm(request.GET)
        if form.is_valid():
            query=form.cleaned_data['query']
          
            results=(
                Post.published.annotate(
                    similarity=TrigramSimilarity('title', query),

                ).filter(similarity__gt=0.1).order_by('-similarity')
            )
    
    return render(
        request,
        'blog/post/search.html',
        {
            'form':form,
            'query':query,
            'results':results
        }
    )
    
#contact section
def contact_view(request):
    sent=False
    if request.method == 'POST':
        form = ContactForm(data=request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            send_mail(
                subject=f"Message from {name}",
                message=f"From: {email}\n\nMessage:\n{message}",
                from_email=email,
                recipient_list=['msamyog37@gmail.com'],
            )
            sent=True
           
    else:
        form = ContactForm()
    return render(
        request,
        'blog/contact.html',
        {
        "form": form,
        'sent':sent 
        })