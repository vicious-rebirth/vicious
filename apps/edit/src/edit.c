#include <string.h>

#include <vicious.h>

#include <GLFW/glfw3.h>

#define CIMGUI_DEFINE_ENUMS_AND_STRUCTS
#define CIMGUI_USE_GLFW
#define CIMGUI_USE_OPENGL3
#include <cimgui.h>
#include <cimgui_impl.h>

#define POOL_SIZE 8192

AssetPool pool;

static bool renderEnterField(VisitorContext *ctx, const char *name, I32 index) {
    char strId[128];
    snprintf(strId, sizeof(strId), "%s%d", name, index);

    return igTreeNodeEx_StrStr(strId, ImGuiTreeNodeFlags_DefaultOpen, index >= 0 ? "%s[%d]" : "%s", name, index);
}

static void renderExitField(VisitorContext *ctx, const char *name, I32 index) {
    igTreePop();
}

static bool renderEnterType(VisitorContext *ctx, const char *name) {
    // Skip metadata
    if (strncmp(name, "Metadata", 8) == 0) return false;

    igSeparatorText(name);

    return true;
}

static void renderBOOL(VisitorContext *ctx, BOOL *self) {
    igCheckbox("value", self);
}

static void renderU8(VisitorContext *ctx, U8 *self) {
    int value = *self;
    igInputInt("value", &value, 1, 1, 0);
    *self = value;
}

static void renderI8(VisitorContext *ctx, I8 *self) {
    int value = *self;
    igInputInt("value", &value, 1, 1, 0);
    *self = value;
}

static void renderU16(VisitorContext *ctx, U16 *self) {
    int value = *self;
    igInputInt("value", &value, 1, 1, 0);
    *self = value;
}

static void renderI16(VisitorContext *ctx, I16 *self) {
    int value = *self;
    igInputInt("value", &value, 1, 1, 0);
    *self = value;
}

static void renderU32(VisitorContext *ctx, U32 *self) {
    double value = *self;
    igInputDouble("value", &value, 1, 1, "%.00f", 0);
    *self = value;
}

static void renderI32(VisitorContext *ctx, I32 *self) {
    int value = *self;
    igInputInt("value", &value, 1, 1, 0);
    *self = value;
}

static void renderF32(VisitorContext *ctx, F32 *self) {
    igInputFloat("value", self, 1, 1, "%.08f", 0);
}

static bool renderID(VisitorContext *ctx, ID *id) {
    char buffer[20];

    snprintf(buffer, sizeof(buffer), "%08X%08X", id->low, id->high);
    igInputText("value", buffer, sizeof(buffer), 0, NULL, NULL);

    sscanf(buffer, "%08X%08X", &id->low, &id->high);

    return false;
}

static bool renderStringBuffer(VisitorContext *ctx, StringBuffer *self) {
    igInputText("value", (char *)self->data, self->size, 0, NULL, NULL);

    return false;
}

static bool renderVector3(VisitorContext *ctx, Vector3 *self) {
    igInputFloat3("value", (F32 *)self, "%.08f", 0);

    return false;
}

VisitorContext visitor = {
    .enterField = renderEnterField,
    .exitField = renderExitField,
    .enterType = renderEnterType,

    .visitBOOL = renderBOOL,
    .visitU8 = renderU8,
    .visitI8 = renderI8,
    .visitU16 = renderU16,
    .visitI16 = renderI16,
    .visitU32 = renderU32,
    .visitI32 = renderI32,
    .visitF32 = renderF32,

    .enterID = renderID,
    .enterStringBuffer = renderStringBuffer,
    .enterVector3 = renderVector3,
};

static void render(AssetFile *assetFile, LocalizationFile *locFile) {
    if (assetFile->magicHeader) {
        visitAssetFile(&visitor, assetFile);
    } else {
        visitLocalizationFile(&visitor, locFile);
    }
}

static bool loadFile(const char *path, AssetFile *assetFile, LocalizationFile *locFile) {
    FILE *file = fopen(path, "r");
    if (file == NULL) return false;

    const char *ext = strrchr(path, '.');
    if (ext == NULL) return false;

    bool isLoc = strcmp(ext, ".loc") == 0;

    StdDecoder decoder;
    stdDecoder(&decoder, file, &pool, NULL);

    poolClear(&pool);

    if (isLoc) {
        decodeLocalizationFile((DecoderContext *)&decoder, locFile);
    } else {
        decodeAssetFile((DecoderContext *)&decoder, assetFile);
    }

    return true;
}

static bool saveFile(const char *path, const AssetFile *assetFile, const LocalizationFile *locFile) {
    FILE *file = fopen(path, "w");
    if (file == NULL) return false;

    const char *ext = strrchr(path, '.');
    if (ext == NULL) return false;

    bool isLoc = strcmp(ext, ".loc") == 0;

    StdEncoder encoder;
    stdEncoder(&encoder, file, &pool);

    if (isLoc) {
        encodeLocalizationFile((EncoderContext *)&encoder, locFile);
    } else {
        encodeAssetFile((EncoderContext *)&encoder, assetFile);
    }

    return true;
}

int main(int argc, const char **argv) {
    int result = 0;

    AssetFile assetFile = { 0 };
    LocalizationFile locFile = { 0 };

    GLFWwindow* window = NULL;

    if (argc < 2) goto usage;

    if (!poolNew(&pool, POOL_SIZE)) goto error;

    const char *filePath = argv[1];
    if (!loadFile(filePath, &assetFile, &locFile)) goto usage;

    if (!glfwInit()) goto error;

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    window = glfwCreateWindow(800, 600, "Vicious Edit", NULL, NULL);
    if (!window) goto error;

    glfwMakeContextCurrent(window);
    glfwSwapInterval(1);

    igCreateContext(NULL);
    ImGuiIO* io = igGetIO_Nil();
    io->ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;

    ImGui_ImplGlfw_InitForOpenGL(window, true);
    ImGui_ImplOpenGL3_Init("#version 330");

    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();

        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        igNewFrame();

        igSetNextWindowPos((ImVec2){ 0, 0 }, 0, (ImVec2){ 0, 0 });
        igSetNextWindowSize(io->DisplaySize, 0);

        igBegin("Window", NULL,
            ImGuiWindowFlags_NoTitleBar
            | ImGuiWindowFlags_NoResize
            | ImGuiWindowFlags_NoMove
            | ImGuiWindowFlags_NoCollapse
            | ImGuiWindowFlags_MenuBar
        );

        if (igBeginMenuBar()) {
            if (igBeginMenu("File", true)) {
                if (igMenuItem_Bool("Save", NULL, false, true)) {
                    saveFile(filePath, &assetFile, &locFile);
                }

                igEndMenu();
            }

            igEndMenuBar();
        }

        render(&assetFile, &locFile);

        igEnd();

        igRender();

        int width, height;
        glfwGetFramebufferSize(window, &width, &height);
        glViewport(0, 0, width, height);
        glClearColor(0, 0, 0, 1.00f);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(igGetDrawData());

        glfwSwapBuffers(window);
    }

    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    igDestroyContext(NULL);

    goto cleanup;

usage:
    printf("usage: %s file_path\n", argv[0]);
error:
    result = 1;
cleanup:
    if (window != NULL) {
        glfwDestroyWindow(window);
    }

    glfwTerminate();

    FreeContext freeCtx = { 0 };
    if (assetFile.magicHeader != 0) freeAssetFile(&freeCtx, &assetFile);
    if (locFile.magicHeader != 0) freeLocalizationFile(&freeCtx, &locFile);

    poolDestroy(&pool);

    return result;
}
