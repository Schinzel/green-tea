package io.schinzel.example;

import com.atexpose.AtExpose;
import com.atexpose.dispatcherfactories.WebServerBuilder;

public class WebServerStarter {
    public static void main(String[] args) {
        AtExpose.create()
                .start(WebServerBuilder.create()
                        .port(5555)
                        .webServerDir("web")
                        .cacheFilesInRAM(false)
                        .build());
        System.out.println("Web server started on port 5555");
    }

}
