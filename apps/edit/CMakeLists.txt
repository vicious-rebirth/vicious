#----------------------------------------------------------------------------------
# Project
#----------------------------------------------------------------------------------

cmake_minimum_required(VERSION 3.10..4.2)
project(ViciousEdit)

#----------------------------------------------------------------------------------
# Options
#----------------------------------------------------------------------------------

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/exe")

set(CMAKE_C_STANDARD 99)

#----------------------------------------------------------------------------------
# Dependencies
#----------------------------------------------------------------------------------

include(FetchContent)

FetchContent_Declare(
    imgui
    GIT_REPOSITORY https://github.com/ocornut/imgui.git
    GIT_TAG v1.92.5
)
FetchContent_MakeAvailable(imgui)

FetchContent_Declare(
    cimgui
    GIT_REPOSITORY https://github.com/cimgui/cimgui.git
    GIT_TAG 1.92.5
)
FetchContent_MakeAvailable(cimgui)

find_package(PkgConfig REQUIRED)
pkg_search_module(GLFW REQUIRED glfw3)

find_package(OpenGL REQUIRED)

add_subdirectory(node_modules/@repo/c)

#----------------------------------------------------------------------------------
# Executables
#----------------------------------------------------------------------------------

add_executable(edit
    src/edit.c

    ${cimgui_SOURCE_DIR}/cimgui.cpp
    ${imgui_SOURCE_DIR}/backends/imgui_impl_glfw.cpp
    ${imgui_SOURCE_DIR}/backends/imgui_impl_opengl3.cpp
)

target_link_libraries(edit
    cimgui
    ${GLFW_LIBRARIES}
    ${OPENGL_LIBRARIES}
    vicious
)

if(EMSCRIPTEN)
    set_target_properties(edit PROPERTIES
        SUFFIX ".html"
    )

    target_link_options(edit PRIVATE
        "--shell-file=${CMAKE_SOURCE_DIR}/src/edit.html"
        -sALLOW_MEMORY_GROWTH
        -sEXPORTED_RUNTIME_METHODS=["FS"]
        -sMODULARIZE
        -sFULL_ES3=1
        -sUSE_GLFW=3
        -sUSE_WEBGL2=1
    )
endif()
