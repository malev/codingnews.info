---
title: Deploy Middleman into S3
date: 2014-09-18 15:45 UTC
tags: ruby, programming, hacking
---

Hello! If you are reading this blog, then you are reading a blog generated with [Middleman](middlemanapp.com). Yet another static site generator! But **I like this one**. Thanks to the community behind it, there are plenty of [extensions](http://directory.middlemanapp.com/#/extensions/all) around there and if you come from the Rails world, you'll find amazing with the [Asset Pipeline](http://middlemanapp.com/basics/asset-pipeline/). Ok, ok, enought. **Let's deploy it into S3!**

We will need a **middleman** app. We are going to use [asistencia-victima](https://github.com/hhba/asistencia-victima). Just clone it and then run:

    git clone https://github.com/hhba/asistencia-victima.git
    cd asistencia-victima

We will need to install a gem called [middleman-s3_sync](https://github.com/fredjean/middleman-s3_sync). So just add it on your `Gemfile` (don't need in this case because it's already there). Then just run:

    bundle
    middleman build

And we will have a `build` directory with the files ready for S3.

## S3 Configuration

Go to your [S3](https://console.aws.amazon.com/s3/home) Web Service. Create a new bucket and grab its name and region. You will also need to change some permissions. Select your brand new bucket and click on properties. Open the permissions accordion and add a new grantee: **Everyone** with **List** permissions.  You will need to edit your bucket policy and leave it like:

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AddPerm",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::PUTHEREYOURBUCKETNAME/*"
            }
        ]
    }

Note: Don't forget to set your bucket name on the snippet.

Finally, open the **Static Website Hosting** accordion. Select **Enable website hosting** and point your **Index Document** to `index.html` and **Error Document** to `404.html`. Save and let's go back to the code!

Open `config.rb` and edit the `s3_sync` block:

    activate :s3_sync do |s3_sync|
      s3_sync.bucket = 'YOURBUCKETNAME'
      s3_sync.region = 'YOURBUCKETREGION'
      s3_sync.aws_access_key_id = 'AWS_ACCESS_KEY_ID'
      s3_sync.aws_secret_access_key = 'AWS_SECRET_ACCESS_KEY'
    end


To find your region code you can check this [table](docs.aws.amazon.com/general/latest/gr/rande.html#s3_region):

```table
| Region name                          |     Region     |
|--------------------------------------|---------------:|
| US Standard                          | us-west-2      |
| US West (Oregon) Region              | us-west-2      |
| US West (Northern California) Region | us-west-1      |
| EU (Ireland) Region                  | eu-west-1      |
| Asia Pacific (Singapore) Region      | ap-southeast-1 |
| Asia Pacific (Sydney) Region         | ap-southeast-1 |
| Asia Pacific (Tokyo) Region          | ap-northeast-1 |
| South America (Sao Paulo) Region     | ap-northeast-1 |
```

**Done!** We are ready to run: `middleman s3_sync`. There are some aspects that you can tweak from here on. You should read `Middleman::S3Sync`'s documentation [here](https://github.com/fredjean/middleman-s3_sync).
