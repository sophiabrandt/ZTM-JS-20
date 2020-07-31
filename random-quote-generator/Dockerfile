# base image
FROM hayd/deno:alpine-1.2.1

# working directory
RUN mkdir -p /opt/deno_app && chown deno:deno /opt/deno_app
WORKDIR /opt/deno_app

# change to non-priviliged user
USER deno

# install Denon for development
RUN deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@2.3.0/denon.ts
ENV PATH=$PATH:/home/deno/.deno/bin

# copy dependencies
COPY --chown=deno:deno api/deps.ts api/deps.ts
RUN deno cache api/deps.ts

# set shell
ENV SHELL /bin/sh

# Run app
ENTRYPOINT ["deno", "run", "--allow-all", "Drakefile.ts"]
CMD ["start"]
