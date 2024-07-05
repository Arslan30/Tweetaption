import { QuotedTweet, Tweet, TweetParent, getTweet } from "react-tweet/api"
import { z } from "zod";
import { TweetMediaSchema } from "../../../../types/TweetSchema";
import { TweetSchemaType } from "../../../../types/constants";

export const getTweetById = async (tweetId: string) => {
  const syndicationTweet = await getTweet(tweetId)

  if (!syndicationTweet) {
    throw new Error("Couldn't find tweet, maybe it got deleted?")
  }

  const tweet = tweetBuilder(syndicationTweet)

  return tweet
}

const tweetBuilder = (syndicationTweet: (Tweet | TweetParent | QuotedTweet) & {
  card?: any
}) => {
  let textHtml = syndicationTweet.text

  syndicationTweet.entities.hashtags.forEach(hashtag => {
    textHtml = textHtml.replace(`#${hashtag.text}`, `<a class="hashtag" href="https://twitter.com/hashtag/${hashtag.text}">#${hashtag.text}</a>`)
  })

  syndicationTweet.entities.symbols.forEach(symbol => {
    textHtml = textHtml.replace(`$${symbol.text}`, `<a class="symbol" href="https://twitter.com/search?q=%24${symbol.text}">$${symbol.text}</a>`)
  })

  syndicationTweet.entities.urls.forEach(url => {
    textHtml = textHtml.replace(url.url, `<a class="url" href="${url.expanded_url}">${url.display_url}</a>`)
  })

  syndicationTweet.entities.user_mentions.forEach(userMention => {
    textHtml = textHtml.replace(`@${userMention.screen_name}`, `<a class="user-mention" href="https://twitter.com/${userMention.screen_name}">@${userMention.screen_name}</a>`)
  })

  syndicationTweet.entities.media?.forEach(media => {
    textHtml = textHtml.replace(media.url, `<a class="media" href="${media.expanded_url}">${media.display_url}</a>`)
  })

  const tweet: TweetSchemaType = {
    id: syndicationTweet.id_str,
    user: syndicationTweet.user,
    url: `https://twitter.com/${syndicationTweet.user.screen_name}/status/${syndicationTweet.id_str}`,
    textHtml,
    created_at: syndicationTweet.created_at,
    media: !("mediaDetails" in syndicationTweet && syndicationTweet.mediaDetails) ? [] :syndicationTweet.mediaDetails.map(media => {
      if (media.type === "video") {
        const variants = media.video_info.variants.filter(variant => variant.content_type === "video/mp4")
        const best_bitrate = Math.max(...variants.map(variant => variant.bitrate ?? 0))
        const best_variant = variants.find(variant => variant.bitrate === best_bitrate)

        if (!best_variant) {
          throw new Error(
            "Couldn't find best variant for video."
          )
        }

        const generator: z.infer<typeof TweetMediaSchema> = {
          type: "video",
          poster: media.media_url_https,
          size: {
            height: media.sizes.large.h,
            width: media.sizes.large.w,
          },
          video: {
            bitrate: best_variant.bitrate ?? null,
            url: best_variant.url,
            duration_millis: (media.video_info as any).duration_millis,
          }
        }

        return generator
      } else if (media.type === "photo") {
        const generator: z.infer<typeof TweetMediaSchema> = {
          type: "photo",
          url: media.media_url_https,
          size: {
            height: media.sizes.large.h,
            width: media.sizes.large.w,
          }

        }
        return generator
      } else {
        return {
          type: "animated_gif",
          url: media.media_url_https,
          size: {
            height: media.sizes.large.h,
            width: media.sizes.large.w,
          }

        }
      }
    }),
    parent: ("parent" in syndicationTweet && syndicationTweet.parent) ? tweetBuilder(syndicationTweet.parent) : undefined,
    quoted_tweet: ("quoted_tweet" in syndicationTweet && syndicationTweet.quoted_tweet) ? tweetBuilder(syndicationTweet.quoted_tweet) : undefined,
  }

  if (syndicationTweet.card) {
    const { binding_values } = syndicationTweet.card
    tweet.media.unshift({
      type: "card",
      poster: binding_values.photo_image_full_size.image_value.url,
      size: {
        width: binding_values.photo_image_full_size.image_value.width,
        height: binding_values.photo_image_full_size.image_value.height,
      },
      title: binding_values.title.string_value,
      vanity_url: binding_values.vanity_url.string_value,
    })
  }

  return tweet
}
