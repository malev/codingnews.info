FROM ruby:2.1.2-onbuild

RUN apt-get update
RUN apt-get -y install nginx nodejs npm

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN mkdir /etc/nginx/ssl

RUN rm /etc/nginx/sites-enabled/default
ADD config/nginx.conf /etc/nginx/sites-enabled/nginx.conf

ADD . /app
WORKDIR /app

RUN bundle install
RUN middleman build

EXPOSE 80

CMD ["nginx"]
