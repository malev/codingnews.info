FROM ruby:2.1.2-onbuild
MAINTAINER Marcos Vanetta "marcosvanetta@gmail.com"

RUN apt-get update
RUN apt-get -y install nginx nodejs npm

ADD . /app
ADD config/nginx.conf /etc/nginx/sites-enabled/nginx.conf
WORKDIR /app

RUN bundle install
RUN middleman build

EXPOSE 80

#CMD ["nginx"]
