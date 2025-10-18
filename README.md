# tweeto.lol
Turn a video tweet into mp4, original tweet and all (thanks to Ryan of ProductHunt for the better tagline).

## How it works

https://github.com/user-attachments/assets/dcd62283-9b2f-447b-88fc-bb580fce4ede

## Background

Launched on [ProductHunt](https://www.producthunt.com/products/tweeto-lol) in 2024 and Twitter at the same time, this tool was originally meant so people in Pakistan (as you can tell from its front page) could easily share Twitter videos *outside* the platform, without losing the frame (Twitter had been banned in Pakistan after a wave of protests and a regime fearful of criticism).

Don't have the attention to continously maintain the app so it was offline most of this year.

Making it public if anyone else wants to run it (although it is annoying), I've made it as easily possible to in what I could — but AWS (where it is designed to be deployed) makes it a living hell.

## How to set it up

Use `pnpm` instead of `npm`, it's a better drop-in solution.

1. Clone app, `git clone https://github.com/zlenner/tweeto.lol`
2. Go to the directory, cd `tweeto.lol`
3. `npm install -g pnpm` if you don't have it (but npm will work too.)
4. `pnpm install` (npm will work too)
5. npm run dev

Now, the app should be running but you need to get do a bit of setup to connect to your AWS account and use in production and click on the "Generate Download Link" button.

The app uses [Remotion Lambda](https://remotion.dev/lambda).

1. First, copy the `.env.example` file to `.env`.

2. Complete the [Lambda setup guide](https://www.remotion.dev/docs/lambda/setup) to get your AWS credentials and fill in the values.

1. Edit the `config.mjs` file to your desired Lambda settings (name etc.), the rest you can leave untouched unless you know what you're doing.

1. Run `npm run deploy` to deploy your Lambda function and Remotion Bundle.

This app uses remotion, so a lot of support can be found on there:
- __Docs:__ Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).
- __Discord:__ Remotion provides help on their [Discord server](https://remotion.dev/discord).
- __Issue with Remotion?:__ [File an issue here](https://remotion.dev/issue).

## Common Errors when deploying to AWS

### AccessDenied

```
AccessDenied: User: arn:aws:iam::XXXXXXXXXXXX:user/remotion-user is not authorized to perform: iam:SimulatePrincipalPolicy on resource: arn:aws:iam::XXXXXXXXXXXX:user/remotion-user because no identity-based policy allows the iam:SimulatePrincipalPolicy action
```
You might have skipped a step when doing all the setup on AWS's console. Happened to me.

### Credit card not added to AWS account

```
Deploying Lambda function... 
💡 This error indicates that you have a AWS account on the free tier or have been limited by your organization. Often times this can be solved by adding a credit card. See also: https://repost.aws/questions/QUKruWYNDYTSmP17jCnIz6IQ/questions/QUKruWYNDYTSmP17jCnIz6IQ/unable-to-set-lambda-memory-over-3008mb
```
### Function not found

```
Function not found: arn:aws:lambda:us-east-1:136693839206:function:remotion-render-4-0-174-mem3009mb-disk2048mb-480sec:$LATEST
```

Your setup was successful! But you didn't deploy the function yet, do that with `npm run deploy`.

### You fixed the set up but getting the same error as before

Wait a few min then try again. AWS takes time to propagate changes, even after it shows up as successful on the dashboard.

### Rate Exceeded (likely to run into this error if this is the first time your AWS account is using Lambda properly)

*how to fix*
[https://www.remotion.dev/docs/lambda/troubleshooting/rate-limit](https://www.remotion.dev/docs/lambda/troubleshooting/rate-limit)

It took me almost nearly 4 hours for approval, good luck.
